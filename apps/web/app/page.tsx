import { prisma } from "db";

  const users = await prisma.user.findMany();

  export default async function Home(){

    
    return (
    <div>
      {JSON.stringify(users)}
    </div>
  );

  }
  
