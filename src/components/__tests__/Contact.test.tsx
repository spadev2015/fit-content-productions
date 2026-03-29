import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../Contact';

// Mock the static image import
vi.mock('../../assets/images/athlete-laughing-gym-hoodie-portrait.jpg', () => ({
  default: 'test-image.jpg',
}));

describe('Contact form', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all form fields', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Instagram Handle')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Select Service')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell me about your brand and goals...')).toBeInTheDocument();
  });

  it('renders service dropdown with 7 options', () => {
    render(<Contact />);
    const options = screen.getAllByRole('option');
    // 7 service options + 1 disabled placeholder = 8
    expect(options).toHaveLength(8);
    expect(screen.getByText('Video Production')).toBeInTheDocument();
    expect(screen.getByText('Custom Video Editing')).toBeInTheDocument();
    expect(screen.getByText('Social Content Creation')).toBeInTheDocument();
    expect(screen.getByText('AI Thumbnail & Cover Design')).toBeInTheDocument();
    expect(screen.getByText('Fitness Media Shoots')).toBeInTheDocument();
    expect(screen.getByText('Content Strategy')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('renders submit button with "Submit Request"', () => {
    render(<Contact />);
    expect(screen.getByRole('button', { name: /submit request/i })).toBeInTheDocument();
  });

  it('submits form data as JSON POST to /api/contact', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText('First Name'), 'Jane');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email Address'), 'jane@test.com');
    await user.type(screen.getByPlaceholderText('Instagram Handle'), '@janefitness');
    await user.type(screen.getByPlaceholderText('Phone Number'), '555-0000');
    await user.selectOptions(screen.getByRole('combobox'), 'Video Production');
    await user.type(screen.getByPlaceholderText('Tell me about your brand and goals...'), 'Test message');

    await user.click(screen.getByRole('button', { name: /submit request/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@test.com',
          igProfile: '@janefitness',
          phoneNumber: '555-0000',
          service: 'Video Production',
          message: 'Test message',
        }),
      });
    });
  });

  it('shows "Submitting..." and disables button during submission', async () => {
    let resolvePromise: (value: unknown) => void;
    fetchMock.mockReturnValueOnce(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText('First Name'), 'Jane');
    await user.type(screen.getByPlaceholderText('Email Address'), 'jane@test.com');
    await user.selectOptions(screen.getByRole('combobox'), 'Video Production');

    await user.click(screen.getByRole('button', { name: /submit request/i }));

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Submitting...');
      expect(button).toBeDisabled();
    });

    // Clean up the hanging promise
    resolvePromise!({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
  });

  it('shows success message and hides form on 200', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText('First Name'), 'Jane');
    await user.type(screen.getByPlaceholderText('Email Address'), 'jane@test.com');
    await user.selectOptions(screen.getByRole('combobox'), 'Video Production');

    await user.click(screen.getByRole('button', { name: /submit request/i }));

    await waitFor(() => {
      expect(screen.getByText('Request Submitted!')).toBeInTheDocument();
    });
    expect(screen.queryByPlaceholderText('First Name')).not.toBeInTheDocument();
  });

  it('shows error message from API on failure', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ success: false, error: 'Missing required fields' }),
    });

    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText('First Name'), 'Jane');
    await user.type(screen.getByPlaceholderText('Email Address'), 'jane@test.com');
    await user.selectOptions(screen.getByRole('combobox'), 'Video Production');

    await user.click(screen.getByRole('button', { name: /submit request/i }));

    await waitFor(() => {
      expect(screen.getByText('Missing required fields')).toBeInTheDocument();
    });
  });

  it('shows fallback error on network failure', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText('First Name'), 'Jane');
    await user.type(screen.getByPlaceholderText('Email Address'), 'jane@test.com');
    await user.selectOptions(screen.getByRole('combobox'), 'Video Production');

    await user.click(screen.getByRole('button', { name: /submit request/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
    });
  });

  it('shows error when success is false despite 200 status', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: false, error: 'Server configuration error' }),
    });

    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText('First Name'), 'Jane');
    await user.type(screen.getByPlaceholderText('Email Address'), 'jane@test.com');
    await user.selectOptions(screen.getByRole('combobox'), 'Video Production');

    await user.click(screen.getByRole('button', { name: /submit request/i }));

    await waitFor(() => {
      expect(screen.getByText('Server configuration error')).toBeInTheDocument();
    });
  });
});
