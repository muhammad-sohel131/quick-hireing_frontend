import CategoryCard from "./CategoryCard";


export default function CategoriesSection() {
  return (
    <section className="cs-container py-14">
      <h2 className="text-4xl lg:text-5xl font-clash font-bold mb-6 text-[var(--neutrals-100)]">
        Explore by <span className="text-[var(--accentColor)]">category</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CategoryCard title="Design" Icon="/images/design.png" jobs={235} />
        <CategoryCard title="Sales" Icon="/images/sales.png" jobs={756} />
        <CategoryCard title="Marketing" Icon="/images/marketing.png" jobs={140} active />
        <CategoryCard title="Finance" Icon="/images/finance.png" jobs={325} />
        <CategoryCard title="Technology" Icon="/images/technology.png" jobs={436} />
        <CategoryCard title="Engineering" Icon="/images/enginnering.png" jobs={542} />
        <CategoryCard title="Business" Icon="/images/business.png" jobs={211} />
        <CategoryCard title="Human Resource" Icon="/images/human.png" jobs={346} />
      </div>
    </section>
  );
}