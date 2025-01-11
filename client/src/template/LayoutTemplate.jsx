<div className="flex min-h-[91vh] w-full justify-between gap-2 xl:gap-20">
  {/* left  */}
  <div className="h-[91vh] hidden xl:block xl:w-[30%] sticky top-[8vh] py-2">
    <div className="h-full w-full flex flex-col items-center justify-center gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar"></div>
  </div>

  {/* center  */}
  <div className="flex flex-col justify-center w-[100%] lg:w-[70%] xl:w-[50%] p-2">
    <div className="h-fit w-full flex flex-col bg-cd rounded-lg p-5"></div>
  </div>

  {/* right  */}
  <div className="h-[91vh] hidden lg:block md:w-[30%] xl:w-[30%] sticky top-[8vh]  py-2">
    <div className="h-full w-full flex flex-col  rounded-lg hover:overflow-y-scroll bg-cd custom-scrollbar"></div>
  </div>
</div>;
