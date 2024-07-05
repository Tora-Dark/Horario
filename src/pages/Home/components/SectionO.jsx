
const Section = ({ id, bgColor, title, description, children }) => {
  return (
    <section id={id} className={`${bgColor} py-20 px-6`}>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl text-white font-bold">{title}</h2>
          <p className="text-muted-foreground text-white text-lg">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
