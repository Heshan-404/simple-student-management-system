import NavigationButtons from "../components/ButtonGroup";
import DataTable from "../components/StudentTable";
import axios from "axios";

export default function ShowPage() {
 
  return (
    <>
      <NavigationButtons />
      <DataTable />
    </>
  );
}
