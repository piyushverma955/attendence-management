import Subject from "../entity/subject";
import Attendence from "../entity/attendence";
import subjectSerice from "../service/subject";

const create = async (payload, id) => {
  const { name, code } = payload;
  let subject = new Subject();
  subject.name = name;
  subject.code = code;
  subject.taughtBy = id;
  return await subjectSerice.create(subject);
};

const getSubjects = async payload => {
  return await subjectSerice.getSubject(payload);
};

const getAllSubjects = async () => {
  return await subjectSerice.getAllSubjects();
};

const update = async (payload, sid, id) => {
  return await subjectSerice.update(payload, sid, id);
};

const _delete = async (sid, id) => {
  return await subjectSerice._delete(sid, id);
};

const enroll = async (sid, id) => {
  let attendence = new Attendence();
  const subject = await subjectSerice.getSubject({ id: sid });
  if (subject.length) {
    attendence.student = id;
    attendence.subject = sid;
    attendence.teacher = subject[0].taughtBy;
    return await subjectSerice.enroll(attendence);
  } else throw new Error("subject is not valid");
};

const getAttendence = async (sid, id) => {
  return await subjectSerice.getAttendence(sid, id);
};

const getAttendenceByTeacher = async (sid, id) => {
  return await subjectSerice.getAttendenceByTeacher(sid, id);
};

const updateAttendence = async (payload, studentId, subjectId, id) => {
  return await subjectSerice.updateAttendence(
    payload,
    studentId,
    subjectId,
    id
  );
};

const e = {
  create,
  getSubjects,
  getAllSubjects,
  update,
  _delete,
  enroll,
  getAttendence,
  getAttendenceByTeacher,
  updateAttendence
};

export default e;
