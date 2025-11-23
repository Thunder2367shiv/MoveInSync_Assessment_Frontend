import { useEffect, useState } from "react";
import axios from "axios";
import RuleImpactChart from "../components/RuleImpactChart";

const RuleImpactPage = () => {
  const [ruleData, setRuleData] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const res = await axios.get(
      "http://localhost:4000/api/dashboard/rule-impact",
      { headers }
    );

    setRuleData(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <RuleImpactChart data={ruleData} />
    </div>
  );
};

export default RuleImpactPage;
