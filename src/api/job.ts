import axios from "@/utils/fetch";
// 获取工作列表 {}
export function fetchGetJobs(data: any) {
  return axios({
    url: "/jobs/getAllJob",
    method: "get",
    data,
  });
}
