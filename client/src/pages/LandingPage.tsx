const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className="text-lg sm:text-xl font-semibold text-teal-700 tracking-wider">CHATNOOK</span>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <button className="px-4 sm:px-8 py-2 sm:py-2.5 border-2 border-teal-600 text-teal-600 rounded-lg text-sm sm:text-base font-medium hover:bg-teal-50 transition-colors">
            Login
          </button>
          <button className="px-4 sm:px-8 py-2 sm:py-2.5 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-teal-700 transition-colors">
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto gap-8 lg:gap-12">
        <div className="flex-1 max-w-xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            Connect friends easily{' '}
            <span className="text-teal-600">&</span>
            <br />
            Quickly
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Our chat app is the perfect way to stay connected
            <br className="hidden sm:inline" />
            {' '}with friends and family.
          </p>
          <button className="px-8 sm:px-10 py-3 sm:py-3.5 bg-teal-600 text-white rounded-lg font-medium text-base sm:text-lg hover:bg-teal-700 transition-colors shadow-md">
            Register Now
          </button>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex justify-center w-full max-w-2xl">
          <div className="relative w-full scale-75 sm:scale-90 lg:scale-100">
            {/* Hanging Lamps - Hidden on mobile */}
            <div className="hidden md:block absolute top-0 left-1/4 w-12 lg:w-16 h-16 lg:h-20 opacity-30">
              <div className="w-0.5 h-10 lg:h-12 bg-gray-300 mx-auto"></div>
              <div className="w-12 lg:w-16 h-10 lg:h-12 bg-gray-300 rounded-b-full"></div>
            </div>
            <div className="hidden md:block absolute top-0 left-1/2 w-12 lg:w-16 h-20 lg:h-24 opacity-30">
              <div className="w-0.5 h-14 lg:h-16 bg-gray-300 mx-auto"></div>
              <div className="w-12 lg:w-16 h-12 lg:h-14 bg-gray-300 rounded-b-full"></div>
            </div>
            <div className="hidden md:block absolute top-0 right-1/4 w-12 lg:w-16 h-22 lg:h-28 opacity-20">
              <div className="w-0.5 h-16 lg:h-20 bg-gray-300 mx-auto"></div>
              <div className="w-12 lg:w-16 h-14 lg:h-16 bg-gray-300 rounded-b-full"></div>
            </div>

            {/* Chat Bubbles and Avatars */}
            <div className="relative mt-16 sm:mt-24 lg:mt-32">
              {/* Top Left Avatar with Chat */}
              <div className="absolute top-0 left-0 sm:left-4 scale-75 sm:scale-90 lg:scale-100">
                <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-orange-400 rounded-full flex items-center justify-center">
                  <div className="w-10 sm:w-11 lg:w-12 h-10 sm:h-11 lg:h-12 bg-orange-500 rounded-full"></div>
                </div>
                <div className="absolute top-6 sm:top-8 left-14 sm:left-16 lg:left-20 bg-teal-700 text-white p-3 lg:p-4 rounded-lg w-36 sm:w-44 lg:w-48 shadow-lg">
                  <div className="space-y-2">
                    <div className="h-1.5 lg:h-2 bg-teal-500 rounded w-3/4"></div>
                    <div className="h-1.5 lg:h-2 bg-teal-500 rounded w-full"></div>
                    <div className="h-1.5 lg:h-2 bg-teal-500 rounded w-2/3"></div>
                  </div>
                </div>
              </div>

              {/* Top Right Avatar with Chat */}
              <div className="absolute top-8 sm:top-12 right-0 sm:right-4 scale-75 sm:scale-90 lg:scale-100">
                <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-red-400 rounded-full flex items-center justify-center ml-auto">
                  <div className="w-10 sm:w-11 lg:w-12 h-10 sm:h-11 lg:h-12 bg-red-500 rounded-full"></div>
                </div>
                <div className="absolute top-6 sm:top-8 right-14 sm:right-16 lg:right-20 bg-teal-700 text-white p-2.5 lg:p-3 rounded-lg w-32 sm:w-40 lg:w-44 shadow-lg">
                  <div className="space-y-2">
                    <div className="h-1.5 lg:h-2 bg-teal-500 rounded w-3/4"></div>
                    <div className="h-1.5 lg:h-2 bg-teal-500 rounded w-full"></div>
                  </div>
                </div>
              </div>

              {/* Laptop */}
              <div className="relative mx-auto w-72 sm:w-80 lg:w-96 mt-32 sm:mt-40 lg:mt-48">
                <div className="bg-gray-800 rounded-t-lg p-1.5 sm:p-2 border-2 sm:border-4 border-gray-800">
                  <div className="bg-white rounded-sm p-4 sm:p-5 lg:p-6 h-44 sm:h-52 lg:h-56">
                    {/* Chat Interface */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 bg-gray-300 rounded-full"></div>
                        <div className="flex-1 h-1.5 lg:h-2 bg-gray-200 rounded w-2/3"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 bg-gray-300 rounded-full"></div>
                        <div className="flex-1 h-1.5 lg:h-2 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 bg-gray-300 rounded-full"></div>
                        <div className="flex-1 h-1.5 lg:h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 h-2.5 sm:h-3 rounded-b-2xl mx-auto w-full"></div>
                <div className="bg-gray-700 h-1 sm:h-1.5 rounded-b-3xl mx-auto w-5/6"></div>
                
                {/* Coffee Cup */}
                <div className="absolute -bottom-6 sm:-bottom-8 -left-8 sm:-left-10 lg:-left-12 w-16 sm:w-18 lg:w-20 h-20 sm:h-22 lg:h-24 scale-75 sm:scale-90 lg:scale-100">
                  <div className="w-14 sm:w-15 lg:w-16 h-16 sm:h-18 lg:h-20 bg-teal-600 rounded-b-lg relative">
                    <div className="absolute top-0 w-14 sm:w-15 lg:w-16 h-1.5 lg:h-2 bg-teal-700 rounded-t-sm"></div>
                  </div>
                  <div className="absolute top-3 sm:top-4 -right-1.5 sm:-right-2 w-5 sm:w-5.5 lg:w-6 h-6 sm:h-7 lg:h-8 border-3 sm:border-4 border-teal-600 rounded-r-full"></div>
                  <div className="absolute -bottom-1.5 sm:-bottom-2 -left-1.5 sm:-left-2 w-16 sm:w-18 lg:w-20 h-2 sm:h-2.5 lg:h-3 bg-gray-300 rounded-full"></div>
                </div>

                {/* Bottom Avatar with Chat */}
                <div className="absolute -bottom-2 sm:-bottom-4 right-4 sm:right-6 lg:right-8 scale-75 sm:scale-90 lg:scale-100">
                  <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-orange-300 rounded-full flex items-center justify-center">
                    <div className="w-10 sm:w-11 lg:w-12 h-10 sm:h-11 lg:h-12 bg-orange-400 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-6 sm:bottom-8 right-14 sm:right-16 lg:right-20 bg-teal-700 text-white p-2.5 lg:p-3 rounded-lg w-32 sm:w-40 lg:w-44 shadow-lg">
                    <div className="space-y-2">
                      <div className="h-1.5 lg:h-2 bg-teal-500 rounded w-full"></div>
                      <div className="h-1.5 lg:h-2 bg-teal-500 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* Plant - Hidden on small mobile */}
                <div className="hidden sm:block absolute -bottom-6 sm:-bottom-8 -right-12 sm:-right-14 lg:-right-16 scale-75 sm:scale-90 lg:scale-100">
                  <div className="w-12 sm:w-14 lg:w-16 h-16 sm:h-18 lg:h-20 bg-gray-300 rounded-t-full relative">
                    <div className="absolute top-2 left-2 w-2.5 sm:w-3 h-10 sm:h-11 lg:h-12 bg-gray-400 rounded-full transform -rotate-12"></div>
                    <div className="absolute top-2 right-2 w-2.5 sm:w-3 h-10 sm:h-11 lg:h-12 bg-gray-400 rounded-full transform rotate-12"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2.5 sm:w-3 h-12 sm:h-13 lg:h-14 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="w-12 sm:w-14 lg:w-16 h-6 sm:h-7 lg:h-8 bg-gray-400 rounded-lg"></div>
                </div>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 mt-12 sm:mt-14 lg:mt-16">
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;