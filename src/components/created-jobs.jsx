// import { getMyJobs } from "@/api/apiJobs";
// import useFetch from "@/hooks/use-fetch";
// import { useUser } from "@clerk/clerk-react";
// import { BarLoader } from "react-spinners";
// import JobCard from "./job-card";
// import { useEffect } from "react";

// const CreatedJobs = () => {
//   const { user } = useUser();

//   const {
//     loading: loadingCreatedJobs,
//     data: createdJobs,
//     fn: fnCreatedJobs,
//   } = useFetch(getMyJobs, {
//     recruiter_id: user.id,
//   });

//   useEffect(() => {
//     fnCreatedJobs();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div>
//       {loadingCreatedJobs ? (
//         <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
//       ) : (
//         <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {createdJobs?.length ? (
//             createdJobs.map((job) => {
//               return (
//                 <JobCard
//                   key={job.id}
//                   job={job}
//                   onJobAction={fnCreatedJobs}
//                   isMyJob
//                 />
//               );
//             })
//           ) : (
//             <div>No Jobs Found 😢</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreatedJobs;

import { useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";

const CreatedJobs = () => {
  const { user } = useUser();
  const { getToken } = useAuth(); // 🔑 Get the Clerk auth token

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = await getToken(); // 🔐 Get the token
      await fnCreatedJobs(token, { recruiter_id: user.id }); // ✅ Pass token + recruiter_id
    };

    if (user?.id) {
      fetchJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <div>
      {loadingCreatedJobs ? (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onJobAction={() =>
                  fnCreatedJobs(getToken(), { recruiter_id: user.id })
                } // 🔁 for reloading after deletion/update
                isMyJob
              />
            ))
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
