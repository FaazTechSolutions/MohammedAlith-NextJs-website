import Counter from "./counter";

export interface AchieveItem {
  Header: string;
  Value: string;
  SubHeader: string;
  

Currencycode: string
  
  
}

export interface AchieveProps {
  achieve: AchieveItem[];
}

export default function Achievements({ achieve }: AchieveProps) {
  return (
    <section className="counter-box py-20 px-18" id="Achievements">
      <div className="counter-container flex flex-wrap justify-center gap-10 container mx-auto">
        {achieve.map((item, idx) => (
          <div key={idx} className="flex flex-col items-start">
            {/* Counter with plus sign */}
            <div className="flex text-6xl font-extrabold">
              <h3 className="inline-block text-6xl font-bold">+</h3>

              <h3 className="inline-block">
                <Counter value={parseInt(item.Value)} duration={2500} idx={2} />
                 
              </h3>
               <p className="text-xl font-normal inline-block relative top-10">{item.Currencycode}</p>
            
            </div>

            {/* Header/label */}
            <p
              className={`text-3xl theme-color pt-2 ${
                idx === 2 ? "text-center w-full" : ""
              }`}
            >
              {item.Header}
              <span className="text-black"> {item.SubHeader}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
