import { CasinoRoyale } from "./casino-royale";

export default function Home() {
  return (
    <>
      {/* <div className="background-diamonds"></div> */}
      <AssetPage />
    </>
  );
}

const AssetPage = () => {
  return <CasinoRoyale />;
};
