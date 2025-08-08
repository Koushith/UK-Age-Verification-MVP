export const HowItWorksStep = ({
  icon: Icon,
  title,
  description,
  isLast = false,
}: {
  icon: any;
  title: string;
  description: string;
  isLast?: boolean;
}) => (
  <li className="flex-start group relative flex [counter-increment:steps] lg:flex-col">
    {!isLast && (
      <span
        className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-200 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
        aria-hidden="true"
      ></span>
    )}
    <div
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-200 group-hover:border-white group-hover:text-white shadow-md"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgb(0, 0, 238)';
        e.currentTarget.style.borderColor = 'white';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'white';
        e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
      }}
    >
      <div className="text-gray-600 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <div className="ml-6 lg:ml-0 lg:mt-10">
      <h3 className="text-lg font-semibold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 before:content-[counter(steps,decimal-leading-zero)]">
        {title}
      </h3>
      <p className="mt-2 text-base text-gray-600 leading-relaxed">{description}</p>
    </div>
  </li>
);
