import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Link from "next/link";

const Community: React.FC = () => {
  return (
    <div>
      <Card>
        {/* <p> Here are our benefits to the selected council:</p> */}
        <h2 className="text-[5vw] sm:text-[3.2vw] md:text-[2.8vw] lg:text-[2.2vw] xl:text-[1.7vw] font-bold mb-2">Local community schemes</h2>
        <p className="text-[3.5vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1vw]">
          This space is where you can learn about all the amazing initiatives
          happening in your local area. It’s divided by option to help you
          manage your item in the way that works for you.
        </p>
      </Card>
      {/* <Link href={"./community/reuse"}>reuse</Link> */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 mt-4 max-w-[1000px] mx-auto text-[3.5vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1vw]">
        <Link
          href="./community/reuse"
          className="flex items-center rounded-full border-2 px-4 py-1 text-white font-semibold home-navi-button sm:py-4"
        >
          <span className="flex-grow text-center">
            Reuse and rehome
          </span>
          <span>➤</span>
        </Link>
        <Link
          href="./community/repair"
          className="flex items-center rounded-full border-2 px-4 py-1 text-white font-semibold home-navi-button"
        >
          <span className="flex-grow text-center">
            Repair
          </span>
          <span>➤</span>
        </Link>
        <Link
          href="./community/recycle"
          className="flex items-center rounded-full border-2 px-4 py-1 text-white font-semibold home-navi-button sm:py-4"
        >
          <span className="flex-grow text-center">
            Recycle
          </span>
          <span>➤</span>
        </Link>
        <Link
          href="./community/sustainability"
          className="flex items-center rounded-full border-2 px-4 py-1 text-white  font-semibold home-navi-button"
        >
          <span className="flex-grow text-center">
            Sustainability initiatives
          </span>
          <span>➤</span>
        </Link>
      </div>

      <Footer parentHeight={0} />
    </div>
  );
};
export default Community;