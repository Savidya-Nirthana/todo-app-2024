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

    {
      id: 3,
      text: "Family Dinner",
      description:
        "Join the family dinner at home. Bring dessert and make sure to catch up on family news.",
      date: new Date("2024-09-19"),
      time: new Date("2024", "09" - 1, "19", "19", "00", "00"),
      priority: 1, // Medium priority
      category: "Family",
      completed: false,
    },
    {
      id: 4,
      text: "Watch New Movie",
      description:
        "Watch the latest blockbuster movie with friends at the local cinema.",
      date: new Date("2024-09-20"),
      time: new Date("2024", "09" - 1, "20", "20", "30", "00"),
      priority: 0, // Low priority
      category: "Entertainment",
      completed: false,
    },
    {
      id: 5,
      text: "Prepare Dinner",
      description:
        "Prepare a homemade dinner with a new recipe you found. Don't forget to buy the ingredients!",
      date: new Date("2024-09-21"),
      time: new Date("2024", "09" - 1, "21", "18", "30", "00"),
      priority: 1, // Medium priority
      category: "Cooking",
      completed: false,
    },
    {
      id: 6,
      text: "Hang Out with Friends",
      description:
        "Plan a casual meetup with friends at the local café. Discuss weekend plans and enjoy some time off.",
      date: new Date("2024-09-22"),
      time: new Date("2024", "09" - 1, "22", "17", "00", "00"),
      priority: 0, // Low priority
      category: "Friends",
      completed: false,
    },
    {
      id: 7,
      text: "Work Project Deadline",
      description:
        "Complete and submit the project for work by the deadline. Ensure all required materials are prepared.",
      date: new Date("2024-09-25"),
      time: new Date("2024", "09" - 1, "25", "12", "00", "00"),
      priority: 2, // High priority
      category: "Work",
      completed: false,
    },
    {
      id: 8,
      text: "Study for Exam",
      description:
        "Prepare for the upcoming exam by reviewing notes and textbooks. Focus on the key topics discussed in class.",
      date: new Date("2024-09-24"),
      time: new Date("2024", "09" - 1, "24", "09", "00", "00"),
      priority: 2, // High priority
      category: "Education",
      completed: false,
    },
    {
      id: 9,
      text: "Bake a Cake",
      description:
        "Bake a cake for the upcoming birthday celebration. Make sure to follow the recipe carefully!",
      date: new Date("2024-09-23"),
      time: new Date("2024", "09" - 1, "23", "15", "00", "00"),
      priority: 1, // Medium priority
      category: "Cooking",
      completed: false,
    },
    {
      id: 10,
      text: "Attend Family Gathering",
      description:
        "Join the family gathering at the park. Spend quality time with relatives and enjoy the outdoor activities.",
      date: new Date("2024-09-26"),
      time: new Date("2024", "09" - 1, "26", "13", "00", "00"),
      priority: 0, // Low priority
      category: "Family",
      completed: false,
    },
  ];
  return data;
};
export default TaskData;
