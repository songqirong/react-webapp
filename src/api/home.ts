import axios from "@/utils/http";
// 获取工作列表 {}
export function fetchGetList(params: any) {
  return axios({
    url: "/jobs/getList",
    method: "get",
    params,
  });
}


