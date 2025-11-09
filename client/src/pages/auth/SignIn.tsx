import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { isLoggingIn, login } = useAuth();

  // login form validation
  const formSchema = z.object({
    email: z.string().email("Invalid email").min(3, "Email is required"),
    password: z.string().min(3, "Password must be at least 3 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isLoggingIn) return;
    login(values);
  };

  return (
    <Card className="shadow-none border-none bg-background">
      <CardHeader className="text-center space-y-4 mb-3">
        <CardTitle className="text-3xl font-semibold text-primary">
          Hello, Welcome Back!
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Happy to see you again, login first.
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-7">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Johndoe@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Remember me */}
              <div className="flex items-center space-x-2 text-sm mt-3">
                <input
                  type="checkbox"
                  id="remember"
                  className="accent-primary"
                />
                <label htmlFor="remember" className="text-muted-foreground">
                  Remember me
                </label>
              </div>
            </div>

            <div className="space-y-3 mt-3 flex flex-col justify-center items-center">
              <Button
                type="submit"
                disabled={isLoggingIn}
                className="w-full sm:w-56 text-white"
              >
                {isLoggingIn && <Spinner />} Login
              </Button>

              <div className="text-center text-sm">
                No account yet?{" "}
                <Link to="/sign-up" className="underline font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
