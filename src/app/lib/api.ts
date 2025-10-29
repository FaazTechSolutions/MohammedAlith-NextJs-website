// import 'server-only';

const En_API_URL = "https://portal.mawarid.com.sa/SystemApi/api/v1/entitytype/dynamic/getbycategoryid?CategoryId=CDN0000012&getfromjson=true"



const Ar_API_URL ="https://portal.mawarid.com.sa/SystemApi/api/v1/entitytype/dynamic/getbycategoryid?CategoryId=CDN0000018&getfromjson=true"
  // const API_URL = locale === "ar" ? Ar_API_URL : En_API_URL;


export async function getMessages(locale: 'ar' | 'en') {
  const API_URL = locale === "ar" ? Ar_API_URL : En_API_URL;
  try {
  
     if (!API_URL) throw new Error("API_URL is not defined in environment variables");
    const res = await fetch(`${API_URL}&locale=${locale}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer Public',
        'Appcode': 'SOL0000008',
        'Area': 'System',
        'Clientsecretid': '536d1e85f7a04cd385c27d98ff949cda',
        'Clientuserid': 'Public',
        'Companycode': 'Mawarid',
      },
      
      // next: { revalidate: 60 } // ISR: revalidate after 60s
    });

   
    if (!res.ok) {
      console.error(`Failed to fetch messages for locale: ${locale}, status: ${res.status}`);
      return {};
    }

    const data = await res.json();
    console.log('API response:', data);
    return data || {};
  } catch (error) {
    
    console.error(`Error fetching messages for locale ${locale}:`, error);
    return {};
  }
}
