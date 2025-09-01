# Next.js Supabase Auth Template

This template provides a robust authentication setup using Next.js 14, Supabase, and Google OAuth. It includes email confirmation, Google Sign-in, and protected routes.

## Features

- 🔐 Email/Password Authentication
- 🌐 Google OAuth Sign-in
- ✉️ Email Confirmation
- 🛡️ Protected Routes
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive Design

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.17 or later
- A Supabase account
- A Google Cloud Console account

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Configuration

1. Create a new project on [Supabase](https://supabase.com)
2. Navigate to Authentication > Email Templates
3. Update the "Confirm signup" template
4. Set the following confirmation URL format:
   ```
   {{ .RedirectTo }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
   ```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google Identity Platform
4. Configure OAuth consent screen
5. Create OAuth 2.0 Client ID credentials
   - Application type: Web application
   - Add authorized redirect URI from Supabase
6. Copy the Client ID and Client Secret

### 4. Supabase Google Auth Configuration

1. In your Supabase dashboard, go to Authentication > Providers
2. Enable Google auth provider
3. Enter the following details:
   - Client ID: Your Google OAuth Client ID
   - Client Secret: Your Google OAuth Client Secret
   - Authorized Client: [Your Client ID from the image]
   - Callback URL: [The URL provided by Supabase]

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app/(auth)` - Authentication pages (sign-in, sign-up)
- `/src/app/(protected)` - Protected routes requiring authentication
- `/src/components/auth` - Authentication components
- `/src/lib` - Utility functions and types
- `/src/utils/supabase` - Supabase client configuration

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
