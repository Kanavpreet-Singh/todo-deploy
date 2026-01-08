import { prismaClient } from "db/client";

  const users = await prismaClient.user.findMany();

  export default async function Home(){

    return (
    <div>
      {JSON.stringify(users)}
    </div>
  );

  }
  
