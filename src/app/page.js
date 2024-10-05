import { CommentForm } from "@/components/CommentForm";
export default function Home() {
  return (
    <>
      <div className="max-w-screen-lg m-auto ">
        <div className="flex justify-between h-10 align-middle items-center">
          <p className="underline text-primary">IRCTC Rail Connect</p>
          <div className="flex gap-6">
            <p>Home</p>
            <p>Presentaion</p>
            <p>Reports</p>
            <p>Team</p>
          </div>
        </div>

        <CommentForm />
      </div>
    </>
  );
}
