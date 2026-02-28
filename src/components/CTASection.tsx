import Image from "next/image";

export default function CTASection() {
  return (
    <section className="cs-container py-16">
      <div className="bg-[url('/images/blueBg.png')] text-center lg:text-left bg-no-repeat bg-cover pt-8 pl-8 pr-8 lg:pt-16 lg:pl-16 lg:pr-16 grid lg:grid-cols-2 gap-10 items-center pb-0">
        <div>
          <h2 className="text-2xl lg:text-5xl font-bold text-[var(--color-white)]">
            Start posting <br /> jobs today
          </h2>
          <p className="text-sm lg:text-md text-[var(--color-white)] mt-4">
            Start posting jobs for only $10.
          </p>
          <button className="mt-6 w-full lg:w-auto bg-[var(--color-white)] text-[var(--brandColor)] px-6 py-3 font-medium">
            Sign Up For Free
          </button>
        </div>

        <Image src='/images/dashboard.png' alt="dashboard" width={500} height={500} />
      </div>
    </section>
  );
}