const TaskData = () => {
  const data = [
    {
      id: 1,
      text: "Doctor Appointment",
      description:
        "Don't forget to attend your scheduled appointment with the doctor. Make sure to bring any necessary documents or previous medical records.",
      date: new Date("2014-04-03"),
      time: new Date("2011", "04" - 1, "11", "11", "51", "00"),
      priority: 0,
      category: "Work",
      completed: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      description:
        "Attend the scheduled meeting at school. Be prepared to discuss recent progress and any important updates",
      date: new Date("2014-04-03"),
      time: new Date("2011", "04" - 1, "11", "11", "51", "00"),
      priority: 2,
      category: "Education",
      completed: false,
    },
  ];
  return data;
};
export default TaskData;
