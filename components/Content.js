import StudentTable from "./StudentTable/StudentTable";
import Header from "./Header";
import { useSelector } from "react-redux";
import VoucherTable from "./VoucherTable/VoucherTable";

const Content = () => {
  const voucherShow = useSelector((state) => state.app.client.voucherShow);
  return (
    <div>
      <Header />
      {voucherShow == true ? <VoucherTable /> : <StudentTable />}
    </div>
  );
};

export default Content;
