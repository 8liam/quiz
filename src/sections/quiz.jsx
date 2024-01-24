export default function Quiz(props) {
  const { quizName } = props;
  console.log(quizName);
  return (
    <section className="bg-primary text-white max-w-[100vw] xl:px-[20%] sm:max-xl:px-[15%] max-sm:px-[2.5%] py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none">
              {quizName}
            </h2>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-3xl/none">
              Question 1
            </h2>
            <p className=" text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              What is the capital of France?
            </p>
          </div>
          <div className="grid grid-cols-4 gap-8 min-[400px]:flex-row text-xl">
            <a className=" bg-primary border border-accent p-2 rounded-xl hover:bg-accent hover:text-black duration-300">A 12 foot wall.</a>
            <a className=" bg-primary border border-accent p-2 rounded-xl hover:bg-accent hover:text-black duration-300">London</a>
            <a className=" bg-primary border border-accent p-2 rounded-xl hover:bg-accent hover:text-black duration-300">Berlin</a>
            <a className=" bg-primary border border-accent p-2 rounded-xl hover:bg-accent hover:text-black duration-300">Madrid</a>
          </div>
          <div className="w-full h-2 mt-4 bg-gray-200 rounded">
            <div
              className="h-full bg-accent rounded"
              style={{
                width: "10%",
              }}
            />
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Question <b className="text-gray-400 ">1</b> of 10
          </p>
          <a className="mt-4 bg-primary p-2 rounded-xl text-white border border-accent  font-bold cursor-pointer hover:bg-accent hover:text-black duration-300">Submit Answer</a>
          <div className="flex  space-x-40 justify-between">
            <div className="p-2 rounded-xl border border-red-400">
              <p>Go Back</p>
            </div>
            <div className="p-2 rounded-xl border border-green-400">
              <p>Forward</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
