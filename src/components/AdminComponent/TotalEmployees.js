import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TotalEmployees() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Only allow access to this information if the user is an admin or has appropriate privileges
      // You can implement this check based on your authentication system

      // Query all user documents in the 'users' collection
      const usersCollectionRef = collection(db, "users");

      getDocs(usersCollectionRef)
        .then((querySnapshot) => {
          const numberOfUsers = querySnapshot.size; // Get the total number of user documents
          setTotalUsers(numberOfUsers);
        })
        .catch((error) => {
          console.error("Error querying user documents:", error);
        });
    } else {
      console.log("User is not authenticated.");
    }
  }, []);

  return (
    <div>
      <div className="flex text-center justify-center  background px-3 py-3  ">
        <div className=" p-5 rounded-lg shadow-lg mb-5 w-[500px] h-[200px] background bg-violet-800  ">
        <FontAwesomeIcon icon={faUsers} className="text-3xl text-center justify-center font-extrabold text-slate-100 mt-10" />
        <p className="text-3xl  text-center justify-center font-extrabold text-slate-100  ">Total Users: {totalUsers}</p> 
        </div>
      </div>
    </div>
  );
}

export default TotalEmployees;
