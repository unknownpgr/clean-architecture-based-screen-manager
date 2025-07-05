import { Container } from "./infrastructure/di/Container";

const port: number = 3000;

// 의존성 주입 컨테이너에서 웹서버 가져오기
const container = Container.getInstance();
const webServer = container.getWebServer();

// 데이터 자동 증가 설정
const dataRepository = container.getDataRepository();
setInterval(() => {
  dataRepository.update();
}, 1000);

// 비활성 연결 정리 설정
const screenConnectionRepository = container.getScreenConnectionRepository();
setInterval(() => {
  screenConnectionRepository.removeInactiveConnections(2000);
}, 2000);

// 웹서버 시작
webServer.start(port);
