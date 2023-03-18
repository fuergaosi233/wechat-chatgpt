/**
 * 使用内存作为数据库
 */
type session = {
  userMsg?: string,
  assistantMsg?: string
}
type user = {
  username: string,
  prompt: string,
  session: session[]
}
type data = user[]
// Initialize data
const data: data = []

/**
 * Add user
 * @param username
 * @param prompt default: ""
 */
function addUser(username: string, prompt: string = ""): user {
  const user = {
    username: username,
    prompt: prompt,
    session: [{
      userMsg: "",
      assistantMsg: ""
    }]
  }
  data.push(user)
  return data.find(user => user.username === username) as user;
}

function addSessionByUsername(
  username: string,
  {userMsg = "", assistantMsg = ""}: session
): void {
  const user = getUserByUsername(username)
  if (user) {
    user.session.push({
      userMsg: userMsg,
      assistantMsg: assistantMsg
    })
  }
}

/**
 * Get user by username
 * @param username
 */
function getUserByUsername(username: string): user | undefined {
  let user = data.find(user => user.username === username);
  return user
}
function getSessionByUsername(username: string): session[] | undefined {
  const user = getUserByUsername(username)
  if (user) {
    return user.session
  }
}
function getAllData(): data {
  return data
}
function setPromptByUsername(username: string, prompt: string): void {
  const user = getUserByUsername(username)
  if (user) {
    user.prompt = prompt
  }else{
    addUser(username,prompt).prompt= prompt
  }
}
function clearUserData(username: string): void {
  const user = getUserByUsername(username)
  if (user) {
    user.prompt = ""
    user.session = [{
      userMsg: "",
      assistantMsg: ""
    }]
  }
}
export {addUser, addSessionByUsername,getUserByUsername, getSessionByUsername,getAllData,setPromptByUsername,clearUserData}