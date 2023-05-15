import { useForm } from "react-hook-form";

export type ConfirmDialogProps = {
  message: string;
  confirmValue: string;
  onConfirm: () => void;
  setHidden: () => void;
};

type ConfirmFormData = {
  userAnswer: string;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  confirmValue,
  onConfirm,
  setHidden,
}) => {
  // react-hook-form
  const { register, handleSubmit } = useForm<ConfirmFormData>();

  // message parsing
  const messageArray = message.split("\n");
  let messageComponent;

  if (messageArray.length === 1) {
    messageComponent = <h2 className="mb-4 text-blue-400">{message}</h2>;
  } else {
    messageComponent = (
      <>
        <h2 className="mb-4 text-blue-400">{messageArray[0]}</h2>
        {messageArray.slice(1).map((messageLine, index) => (
          <p key={index}>{messageLine}</p>
        ))}
      </>
    );
  }

  // submit Handler
  const formSubmitHandler = async (data: ConfirmFormData) => {
    if (data.userAnswer && data.userAnswer === confirmValue) {
      onConfirm();
    }
    setHidden();
  };

  return (
    <div className="absolute top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black/80">
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div className="flex flex-col rounded-lg bg-white p-8 shadow-lg">
          {messageComponent}
          <div className="mb-4">
            <input
              className="mb-4 w-full border py-2 px-3 text-darkgrey-200"
              {...register("userAnswer")}
            />
          </div>
          <div className="flex items-center justify-evenly">
            <div className="admin-button" role="button" onClick={setHidden}>
              Cancel
            </div>
            <input
              type="submit"
              value="OK"
              className="admin-button-warning"
              role="button"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConfirmDialog;
