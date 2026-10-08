import AllProducts from "@/component/AllProducts";
import Banner from "@/component/Banner";
import PriceDecreasedProducts from "@/component/PriceDecreasedProducts";
import PriceIncreaseProducts from "@/component/PriceIncreaseProducts";


export default function Home() {
  return (
    <div>

      <Banner></Banner>
      <PriceIncreaseProducts></PriceIncreaseProducts>
      <PriceDecreasedProducts></PriceDecreasedProducts>
      <AllProducts></AllProducts>

    </div>
    
  );
}
