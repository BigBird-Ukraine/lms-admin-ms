import { IGroup } from '../../interfaces';

export const editVisitLog = (group: IGroup, visitLogId: string, studentId: string) => {
  if (group.attendance) {
    const attendance = group.attendance;
    const index = attendance.findIndex(vL => vL._id && vL._id.toString() === visitLogId);

    attendance[index].absent_students_id.includes(studentId) ? (
      attendance[index].absent_students_id = attendance[index].absent_students_id.filter(aSt => aSt.toString() !== studentId),
        attendance[index].present_students_id.push(studentId)
    ) : (
      attendance[index].present_students_id = attendance[index].present_students_id.filter(pSt => pSt.toString() !== studentId),
        attendance[index].absent_students_id.push(studentId));

    return group.attendance;
  }
};
