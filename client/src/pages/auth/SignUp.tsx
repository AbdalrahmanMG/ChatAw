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

const SignUp = () => {
  const { isSigningup, register } = useAuth();

  // register form validation
  const formSchema = z.object({
    name: z.string().min(3, "Name is requried"),
    email: z.string().email("Invalid email").min(3, "Email is required"),
    password: z.string().min(3, "Password must be at least 3 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isSigningup) return;
    register(values);
  };

  return (
        <Card className="shadow-none border-none bg-background">
          <CardHeader className="text-center space-y-4 mb-3">
            <CardTitle className="text-3xl font-semibold text-primary">
              Create your account
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Welcome! Please fill in the details to continue.
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-7"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

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

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-3 mt-3 flex flex-col justify-center items-center">
                  <Button
                    type="submit"
                    disabled={isSigningup}
                    className="w-full sm:w-56 text-white"
                  >
                    {isSigningup && <Spinner />} Sign Up
                  </Button>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline font-medium">
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
  );
};

export default SignUp;
