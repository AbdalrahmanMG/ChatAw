import LandingIllustration from "@/components/LandingIllustration";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-0 ml-5">
          <Logo imgClass="size-[70px]" showText={false} />
          <span className="text-lg sm:text-xl font-semibold text-primary tracking-wider">
            ChatAw
          </span>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <Button
            variant="outline"
            className="px-4 sm:px-9 py-2 sm:py-6 border-2 border-primary text-primary rounded-lg text-sm sm:text-base font-medium hover:bg-accent"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            className="px-4 sm:px-9 py-2 sm:py-6 bg-primary text-primary-foreground rounded-lg text-sm sm:text-base font-medium hover:bg-primary/90"
            onClick={() => navigate("/sign-up")}
          >
            Register
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto gap-8 lg:gap-12">
        <div className="flex-1 max-w-xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
            Connect friends easily <span className="text-primary">&</span>
            <br />
            Quickly
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
            Our chat app is the perfect way to stay connected
            <br className="hidden sm:inline" /> with friends and family.
          </p>
          <Button
            className="px-8 sm:px-10 py-3 sm:py-7 bg-primary text-primary-foreground rounded-lg font-medium text-base sm:text-lg hover:bg-primary/90 shadow-md"
            onClick={() => navigate("/sign-up")}
          >
            Register Now
          </Button>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <LandingIllustration />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
