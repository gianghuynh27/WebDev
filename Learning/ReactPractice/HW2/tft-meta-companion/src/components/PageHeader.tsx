type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};
function PageHeader(props: PageHeaderProps) {
  return (
    <section className="space-y-3">
      <p className="text-sm font-medium text-cyan-300">{props.eyebrow}</p>
      <h2 className="text-3xl font-semibold">{props.title}</h2>
      <p className="max-w-2xl text-slate-300">{props.description}</p>
    </section>
  );
}

export default PageHeader;
