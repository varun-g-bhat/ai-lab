import { fetchRoadmap } from "@/http/aiTutorApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { IRoadMap } from "@/types/aitutor";
import { ScrollArea } from "@/components/ui/scroll-area";

const Learning: React.FC = () => {
  const [learnigs, setLearnings] = useState<IRoadMap[]>([]);

  useEffect(() => {
    const fetchLearnings = async () => {
      const response = await fetchRoadmap();
      setLearnings(response.data);
      console.log(response.data);
    };
    fetchLearnings();
  }, []);

  return (
    <>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-2xl font-bold">My Learnings</legend>
        <ScrollArea className="w-full h-[650px] rounded-md border">
          <div className="xl:p-4 p-1 lg:p-3 md:p-3 sm:p-2">
            {learnigs.map((topic) => (
              <Link
                to={`${topic._id}`}
                className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
              >
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                <div className="sm:flex sm:justify-between sm:gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                      {topic.RoadMapFor}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-600">
                      Courses - {topic.RoadMap.length}
                    </p>
                  </div>

                  <div className="hidden sm:block sm:shrink-0">
                    <img
                      alt=""
                      src={topic.Image}
                      className="size-16 rounded-lg object-contain shadow-sm"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-pretty text-sm text-gray-500">
                    {topic.Outcome}
                  </p>
                </div>

                <dl className="mt-6 flex gap-4 sm:gap-6">
                  <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                      Created At
                    </dt>
                    <dd className="text-xs text-gray-500">
                      {moment(topic.createdAt).format("DD MMM, YYYY")}
                    </dd>
                  </div>

                  <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                      Completed
                    </dt>
                    <dd className="text-xs text-gray-500">0%</dd>
                  </div>
                </dl>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </fieldset>
    </>
  );
};

export default Learning;
