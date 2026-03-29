import type { VercelRequest, VercelResponse } from '@vercel/node';
import handler from '../contact';

// Mock the Resend module — vi.hoisted() ensures mockSend is available when vi.mock is hoisted
const { mockSend } = vi.hoisted(() => ({
  mockSend: vi.fn(),
}));
vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = { send: mockSend };
  },
}));

function createMockRequest(overrides: Partial<VercelRequest> = {}): VercelRequest {
  return {
    method: 'POST',
    body: {},
    ...overrides,
  } as VercelRequest;
}

function createMockResponse(): VercelResponse & { _status: number; _json: unknown } {
  const res = {
    _status: 200,
    _json: null as unknown,
    status(code: number) {
      res._status = code;
      return res;
    },
    json(data: unknown) {
      res._json = data;
      return res;
    },
  };
  return res as unknown as VercelResponse & { _status: number; _json: unknown };
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('NOTIFICATION_EMAIL', 'admin@test.com');
    mockSend.mockReset();
    mockSend.mockResolvedValue({ data: { id: 'test-email-id' }, error: null });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const validBody = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    service: 'Video Production',
    message: 'Test message',
  };

  it('rejects GET with 405', async () => {
    const req = createMockRequest({ method: 'GET' });
    const res = createMockResponse();
    await handler(req, res);
    expect(res._status).toBe(405);
    expect(res._json).toEqual({ success: false, error: 'Method not allowed' });
  });

  it('rejects PUT with 405', async () => {
    const req = createMockRequest({ method: 'PUT' });
    const res = createMockResponse();
    await handler(req, res);
    expect(res._status).toBe(405);
    expect(res._json).toEqual({ success: false, error: 'Method not allowed' });
  });

  it('returns 400 when firstName is missing', async () => {
    const req = createMockRequest({ body: { ...validBody, firstName: '' } });
    const res = createMockResponse();
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(res._json).toEqual({ success: false, error: 'Missing required fields' });
  });

  it('returns 400 when email is missing', async () => {
    const req = createMockRequest({ body: { ...validBody, email: '' } });
    const res = createMockResponse();
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(res._json).toEqual({ success: false, error: 'Missing required fields' });
  });

  it('returns 400 when service is missing', async () => {
    const req = createMockRequest({ body: { ...validBody, service: '' } });
    const res = createMockResponse();
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(res._json).toEqual({ success: false, error: 'Missing required fields' });
  });

  it('returns 500 when NOTIFICATION_EMAIL is not set', async () => {
    vi.stubEnv('NOTIFICATION_EMAIL', '');
    const req = createMockRequest({ body: validBody });
    const res = createMockResponse();
    await handler(req, res);
    expect(res._status).toBe(500);
    expect(res._json).toEqual({ success: false, error: 'Server configuration error' });
  });

  it('sends email and returns 200 on valid payload', async () => {
    const req = createMockRequest({ body: validBody });
    const res = createMockResponse();
    await handler(req, res);

    expect(res._status).toBe(200);
    expect(res._json).toEqual({ success: true });
    expect(mockSend).toHaveBeenCalledOnce();

    const sendArgs = mockSend.mock.calls[0][0];
    expect(sendArgs.to).toBe('admin@test.com');
    expect(sendArgs.replyTo).toBe('test@test.com');
    expect(sendArgs.subject).toBe('New Booking Request from Test User');
    expect(sendArgs.html).toContain('Test User');
    expect(sendArgs.html).toContain('test@test.com');
    expect(sendArgs.html).toContain('Video Production');
  });

  it('includes igProfile and phoneNumber in HTML when provided', async () => {
    const body = { ...validBody, igProfile: '@testfit', phoneNumber: '555-1234' };
    const req = createMockRequest({ body });
    const res = createMockResponse();
    await handler(req, res);

    const html: string = mockSend.mock.calls[0][0].html;
    expect(html).toContain('Instagram');
    expect(html).toContain('@testfit');
    expect(html).toContain('Phone');
    expect(html).toContain('555-1234');
  });

  it('omits optional fields from HTML when absent', async () => {
    const req = createMockRequest({ body: validBody });
    const res = createMockResponse();
    await handler(req, res);

    const html: string = mockSend.mock.calls[0][0].html;
    expect(html).not.toContain('Instagram');
    expect(html).not.toContain('Phone');
  });

  it('returns 500 when Resend returns an API error', async () => {
    mockSend.mockResolvedValueOnce({ data: null, error: { message: 'Domain not verified', name: 'validation_error' } });
    const req = createMockRequest({ body: validBody });
    const res = createMockResponse();
    await handler(req, res);

    expect(res._status).toBe(500);
    expect(res._json).toEqual({ success: false, error: 'Domain not verified' });
  });

  it('returns 500 with error message when Resend throws', async () => {
    mockSend.mockRejectedValueOnce(new Error('Network failure'));
    const req = createMockRequest({ body: validBody });
    const res = createMockResponse();
    await handler(req, res);

    expect(res._status).toBe(500);
    expect(res._json).toEqual({ success: false, error: 'Network failure' });
  });
});
