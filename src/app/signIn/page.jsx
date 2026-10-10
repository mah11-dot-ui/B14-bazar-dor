import AuthPage from '@/components/AuthPage';

export default function SignInPage() {
    return (
        <AuthPage
            mode="signIn"
            socialProviders={{
                google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
                github: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
            }}
        />
    );
}
