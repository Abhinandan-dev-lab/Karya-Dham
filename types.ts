
export interface WeeklyGoal {
  week: number;
  topic: string;
  resources: string[];
  goal: string;
}

export interface MonthlyBreakdown {
  month: number;
  focus: string;
  weeklyGoals: WeeklyGoal[];
}

export interface StudyPlan {
  planTitle: string;
  monthlyBreakdown: MonthlyBreakdown[];
}
