import React, { useEffect, useState } from "react";
import "./index.scss";
const Home: React.FC = () => {
  const [phone, setPhone] = useState<string | undefined>(undefined);
  useEffect(() => {
    setPhone("15727531836");
  });
  return (
    <section className="home-container">
      <div>
        <span>{phone}</span>
      </div>
    </section>
  );
};
export default Home;
