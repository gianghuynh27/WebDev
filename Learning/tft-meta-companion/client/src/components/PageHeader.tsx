type PageHeaderProps = {
  title: string;
  description: string;
};
function PageHeader(props: PageHeaderProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-3xl font-semibold">{props.title}</h2>
      <p className="max-w-2xl text-slate-300">{props.description}</p>
    </section>
  );
}

export default PageHeader;
