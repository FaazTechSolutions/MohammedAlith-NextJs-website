


 export interface service {
  RecId: number;
 
  Image?: string;
  imgposition?: "Left" | "Right" | null;
  IsBackground?: "True" | "False" | null;
  action?: string | null;
  Order: number;
}



export interface ServiceProps {
  servicesbox: service[];
}


export default async function Services({servicesbox}:ServiceProps){
     const sortedBanners = [...servicesbox].sort((a, b) => a.Order - b.Order); 
    

      
     
    return(
         <div className='serviceboxes  '>
      {sortedBanners.map((service:any, index:number) => (
        <div className="card" key={index}>
          <a href={service.PageUrl} target='_blank'>
        <img
          key={index}
          src={service.Image}
          alt={`Service ${index + 1}`}
        
        />
        </a>
        </div>
      ))}
    </div>
    )
}