import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PromoModal from '../PromoModal';

// Mock motion/react to avoid animation complexity
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('PromoModal', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not render modal immediately', () => {
    vi.useFakeTimers();
    render(<PromoModal />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('opens after 1500ms delay', () => {
    vi.useFakeTimers();
    render(<PromoModal />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('renders all 5 form fields when open', async () => {
    render(<PromoModal />);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Instagram Handle')).toBeInTheDocument();
  });

  it('closes on X button click', async () => {
    const user = userEvent.setup();
    render(<PromoModal />);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    }, { timeout: 3000 });

    await user.click(screen.getByLabelText('Close promotional offer'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on backdrop click', async () => {
    const user = userEvent.setup();
    render(<PromoModal />);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    }, { timeout: 3000 });

    const backdrop = screen.getByRole('dialog');
    await user.click(backdrop);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does NOT close on inner content click', async () => {
    const user = userEvent.setup();
    render(<PromoModal />);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Click the heading inside the modal (inner content)
    await user.click(screen.getByText(/Book a/));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('submits with hardcoded service and message', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const user = userEvent.setup();
    render(<PromoModal />);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    }, { timeout: 3000 });

    await user.type(screen.getByPlaceholderText('First Name'), 'Jane');
    await user.type(screen.getByPlaceholderText('Email Address'), 'jane@test.com');

    await user.click(screen.getByRole('button', { name: /claim your free session/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledOnce();
    });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.service).toBe('Free Shooting Promo');
    expect(body.message).toBe('Submitted via free shooting promo popup.');
  });

  it('shows "You\'re Booked!" on success', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const user = userEvent.setup();
    render(<PromoModal />);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    }, { timeout: 3000 });

    await user.type(screen.getByPlaceholderText('First Name'), 'Jane');
    await user.type(screen.getByPlaceholderText('Email Address'), 'jane@test.com');

    await user.click(screen.getByRole('button', { name: /claim your free session/i }));

    await waitFor(() => {
      expect(screen.getByText("You're Booked!")).toBeInTheDocument();
    });
  });

  it('shows error message on failure', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ success: false, error: 'Something went wrong' }),
    });

    const user = userEvent.setup();
    render(<PromoModal />);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    }, { timeout: 3000 });

    await user.type(screen.getByPlaceholderText('First Name'), 'Jane');
    await user.type(screen.getByPlaceholderText('Email Address'), 'jane@test.com');

    await user.click(screen.getByRole('button', { name: /claim your free session/i }));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  it('disables button and shows "Submitting..." during submission', async () => {
    let resolvePromise: (value: unknown) => void;
    fetchMock.mockReturnValueOnce(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    const user = userEvent.setup();
    render(<PromoModal />);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    }, { timeout: 3000 });

    await user.type(screen.getByPlaceholderText('First Name'), 'Jane');
    await user.type(screen.getByPlaceholderText('Email Address'), 'jane@test.com');

    await user.click(screen.getByRole('button', { name: /claim your free session/i }));

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /submitting/i });
      expect(button).toHaveTextContent('Submitting...');
      expect(button).toBeDisabled();
    });

    // Clean up
    resolvePromise!({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
  });
});
