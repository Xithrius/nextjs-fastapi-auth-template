import { defaultSession } from "@/lib/lib";
import useSession from "@/lib/use-session";

export function Form() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <p className="text-lg">Loading...</p>;
  }

  if (session.isLoggedIn) {
    return (
      <>
        <p className="text-lg">
          Logged in user: <strong>{session.email}</strong>
        </p>
        <LogoutButton />
      </>
    );
  }

  return <LoginForm />;
}

function LoginForm() {
  const { login } = useSession();

  return (
    <form
      onSubmit={function (event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        login(
          { email: email, password: password },
          {
            optimisticData: {
              isLoggedIn: true,
              username: email,
            },
          }
        );
      }}
      method="POST"
    >
      <label className="block text-lg">
        <span>Email</span>
        <input
          type="text"
          name="email"
          placeholder=""
          defaultValue="asdf@asdf.com"
          required
          // for demo purposes, disabling autocomplete 1password here
          autoComplete="off"
          data-1p-ignore
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="text"
          name="password"
          placeholder=""
          defaultValue="asdf"
          required
          // for demo purposes, disabling autocomplete 1password here
          autoComplete="off"
          data-1p-ignore
        />
      </label>
      <div>
        <input type="submit" value="Login" />
      </div>
    </form>
  );
}

function LogoutButton() {
  const { logout } = useSession();

  return (
    <p>
      <a
        onClick={(event) => {
          event.preventDefault();
          logout(null, {
            optimisticData: defaultSession,
          });
        }}
      >
        Logout
      </a>
    </p>
  );
}
