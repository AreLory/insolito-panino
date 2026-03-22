interface Props {
  title: string;
  children: any;
}

export const HomeSection = ({ title, children }: Props) => (
  <div className="w-full max-w-6xl mx-auto py-10">
    <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
      {title}
    </h2>
    {children}
  </div>
);
