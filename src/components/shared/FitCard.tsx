import Image from "next/image";
import { IFit } from "../../types/fits.type";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { FaFireAlt } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";

const FitCard = ({ fit }: { fit: IFit }) => {
  return (
    <Link href={`/fits/${fit.id}`}>
      <div
        key={fit.id}
        className="bg-[#17171a] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
      >
        <div className="relative w-full h-56 bg-zinc-900 flex items-center justify-center p-0">
          <Image
            src={fit.image}
            alt={fit.name}
            fill
            className="object-cover p-0 drop-shadow-lg"
          />
        </div>

        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {fit.muscleGroups?.map((group: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-[#1f2923] text-[#a3e635] font-bold text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider"
                >
                  {group}
                </span>
              ))}
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black tracking-wide uppercase">
                {fit.name}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm">
                {fit.equipment}
              </p>
            </div>
          </div>

          <div className="divider my-1 border-zinc-800"></div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="flex justify-between items-center gap-1 text-gray-400">
                <MdOutlineWatchLater />
                {fit.duration} min
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="flex justify-between items-center gap-1 text-gray-400">
                <FaFireAlt />
                {fit.caloriesBurned || 0} kcal
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="flex justify-between items-center gap-1 text-gray-400">
                <FaRegStar />
                {fit.rating || 4.5}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FitCard;
