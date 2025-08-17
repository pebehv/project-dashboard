import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Project } from "../app/data/type/project";
import { processTeamData, processPriorityData } from "./chartUtils";

interface ProjectChartsProps {

  title: string;
  axis: string;
  bar_: string;
  data_: object[];
  fill: string
}

export function ProjectChartsBar({  title, axis, bar_, data_ , fill}: ProjectChartsProps) {
  

  return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data_} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={axis} />
              <YAxis />
              <Tooltip />
              <Bar dataKey= {bar_} fill={fill} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

  );
}