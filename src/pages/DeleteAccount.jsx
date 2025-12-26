import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { deleteAccount } from "../API/deleteUserServices";
import { useMutation } from "@tanstack/react-query";

const whatHappens = [
  "History : Your past schemes, transactions and purchase informations will be permenantly deleted",
  "Personal information: Any saved data like ypur personal details and kyc details, id details and photos will be deleted permenantly",
  "No Re-Activation: Once you delete your account permanently, your account can't be re-activated. To use Arabian gold again, you will need to create a new account",
];

const beforeDelete = [
  "Complete Pending Schemes: Ensure that all your current schemes are paid and completed",
  "Use Credit/Redeem points: All the credit and redeem points you got(If any), use them before deletion as they will be forfeited",
  "Contact Support: For help, please contact our support team for any help",
];

const DeleteAccount = () => {
  const [params] = useSearchParams();

  const userId = params.get("uid");

  const [countdown, setCountdown] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteAccount(userId),

    onSuccess: (res) => {
      toast.success("Your account has been deleted successfully");
      console.log(res);
      setCountdown(5);
    },

    onError: (err) => {
      toast.error("Account deletion failed. Please try after some time.");
      console.log(err);
    },
  });

  useEffect(() => {
  if (countdown === null) return;

  const toastId = "redirect-toast";

  if (!toast.isActive(toastId)) {
    toast.info(`Redirecting in ${countdown} seconds...`, {
      toastId,
      autoClose: false,
    });
  } else {
    toast.update(toastId, {
      render: `Redirecting in ${countdown} seconds...`,
    });
  }

  if (countdown === 0) {
    toast.dismiss(toastId);
    window.close();
    // closeOrRedirect();
    return;
  }

  const timer = setTimeout(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [countdown]);

  const handleSubmit = () => {
    console.log("Delete confirmed for user:", userId);

    mutate();
  };

  //  if (!userId || !token) {
  //   return <p>Invalid delete link.</p>;
  // }

  return (
    <div className="w-full h-screen flex flex-col bg-white overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto flex flex-col p-5 ">
        {/* heading  */}

        <h1 className=" lg:text-4xl md:text-3xl text-2xl font-bold text-gray-900 ">
          Delete Account
        </h1>

        <h2 className="lg:text-2xl md:text-xl w-full text-center capitalize font-bold mt-12 text-lg text-gray-800 ">
          Deleting your Arabian Gold account?
        </h2>

        <div className="w-full h-fit flex flex-col gap-5 mt-20">
          {/* warning  */}
          <div className="w-full h-fit border border-red-500 rounded-lg bg-red-100 p-4 ">
            <p className="font-semibold text-red-500 text-xs lg:text-sm ">
              We are sad to see ypu go. Please read the instructions below
              carefully before proceeding with your account deletion. Once your
              account is deleted , all associated data will be permenantly
              removed and cannot be recovered later
            </p>
          </div>

          {/* what happen  */}

          <div className="w-full h-fit flex flex-col gap-2">
            <h3 className="font-bold lg:text-xl text-lg capitalize text-gray-700 ">
              What happens when you delete your account ?
            </h3>

            <ul className="list-disc pl-5 space-y-2">
              {whatHappens.map((itm, i) => (
                <li
                  key={i}
                  className="w-full h-fit text-left font-medium text-base text-gray-700"
                >
                  {itm}
                </li>
              ))}
            </ul>
          </div>

          {/* before you delete  */}

          <div className="w-full h-fit flex flex-col gap-2">
            <h3 className="font-bold lg:text-xl text-lg capitalize text-gray-700 ">
              Before You Delete
            </h3>

            <ul className="list-disc pl-5 space-y-2">
              {beforeDelete.map((itm, i) => (
                <li
                  key={i}
                  className="w-full h-fit text-left font-medium lg:text-base text-sm text-gray-700"
                >
                  {itm}
                </li>
              ))}
            </ul>
          </div>

          {/* form  */}

          <div className="w-full h-fit mt-8">
            <Formik
              initialValues={{ confirmDelete: false }}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form className="w-full flex flex-col gap-6">
                  {/* checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Field
                      type="checkbox"
                      name="confirmDelete"
                      className="mt-1 h-4 w-4 accent-red-600"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      I understand that deleting my account is a permanent
                      action and that all my data will be irreversibly deleted.
                    </span>
                  </label>

                  {/* buttons */}
                  <div className="w-full flex gap-4">
                    {/* delete button */}
                    <button
                      type="submit"
                      disabled={!values.confirmDelete || isPending}
                      className={`w-1/2 py-3 rounded-lg font-semibold text-white transition-all
              ${
                values.confirmDelete
                  ? "bg-red-600 hover:bg-red-700 active:bg-red-500"
                  : "bg-red-300 cursor-not-allowed"
              }
            `}
                    >
                      Delete My Account
                    </button>

                    {/* keep account button */}
                    <button
                      type="button"
                      disabled={!values.confirmDelete || isPending}
                      onClick={() => window.close()}
                      className={`w-1/2 py-3 rounded-lg font-semibold transition-all
              ${
                values.confirmDelete
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
                    >
                      Keep My Account
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
