import db = require("../connection");
import Subject from "../entity/subject";
import Attendence from "../entity/attendence";

const create = async payload => {
  let connection = await db.connection;
  const subjectRepository = connection.getRepository(Subject);
  let res = await subjectRepository.save(payload);
  return res;
};

const getSubject = async payload => {
  let connection = await db.connection;
  const subjectRepository = connection.getRepository(Subject);
  let res = await subjectRepository.find(payload);
  return res;
};

const getAllSubjects = async () => {
  let connection = await db.connection;
  const subjectRepository = connection.getRepository(Subject);
  let res = await subjectRepository.find();
  return res;
};

const update = async (payload, sid, id) => {
  let connection = await db.connection;
  const subjectRepository = connection.getRepository(Subject);
  let subject = await subjectRepository.findOne({ id: sid, taughtBy: id });
  if (subject) {
    if (payload.name) subject.name = payload.name;
    if (payload.code) subject.code = payload.code;
    let res = await subjectRepository.save(subject);
    return res;
  } else throw new Error("subject not found");
};

const _delete = async (sid, id) => {
  let connection = await db.connection;
  const subjectRepository = connection.getRepository(Subject);
  let subject = await subjectRepository.findOne({ id: sid, taughtBy: id });
  if (subject) {
    await subjectRepository.delete({ id: sid, taughtBy: id });
    return { success: true, id: sid };
  } else throw new Error("subject not found");
};

const enroll = async payload => {
  let connection = await db.connection;
  const attendenceRepository = connection.getRepository(Attendence);
  let res = await attendenceRepository.save(payload);
  return res;
};

const getAttendence = async (sid, id) => {
  let connection = await db.connection;
  const subjectRepository = connection.getRepository(Attendence);
  let res = await subjectRepository.findOne({
    student: id,
    subject: sid
  });
  if (res) {
    return { attendence: res.attendence };
  } else throw new Error("subject not found");
};

const getAttendenceByTeacher = async (sid, id) => {
  let connection = await db.connection;
  const attendenceRepository = connection.getRepository(Attendence);
  let res = await attendenceRepository.find({
    teacher: id,
    subject: sid
  });
  if (res.length) {
    return res;
  } else throw new Error("no entry found");
};

const updateAttendence = async (payload, studentId, subjectId, id) => {
  const { attendence } = payload;
  let connection = await db.connection;
  const attendenceRepository = connection.getRepository(Attendence);
  let res = await attendenceRepository.findOne({
    student: studentId,
    subject: subjectId,
    teacher: id
  });

  if (res) {
    if (attendence) res.attendence = attendence;
    return await attendenceRepository.save(res);
  } else throw new Error("no entry found");
};

const e = {
  create,
  getSubject,
  getAllSubjects,
  update,
  _delete,
  enroll,
  getAttendence,
  getAttendenceByTeacher,
  updateAttendence
};

export default e;
