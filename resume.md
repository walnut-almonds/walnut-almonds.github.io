# 許凱傑 Alger_Hsu
### Go / Backend Software Developer
[cake](https://www.cake.me/ewew61212)
 • [104](https://pda.104.com.tw/profile/share/8u4csxeUdy2vb5JASn84iq7Z2kje6PWK)
 • [linkedin](https://www.linkedin.com/in/kai-jie-hsu-b895a5265)
 • [github](https://github.com/walnut-almonds)
 • [medium](https://medium.com/@ewew61212)

**Email:** ewew61212@gmail.com | **Phone:** +886 972-995-881 | **Location:** Taipei, Taiwan

---

## About me
我是來自台灣台北的電腦工程師，熱愛程式設計、開發和解決問題，希望能夠從事程式相關的任何工作，想體驗各種不同的技術領域，持續學習和成長。

## Experience
### CDN 工程師 | [端點智能科技有限公司 (Wise Point Solutions Technology)](https://wisepointtech.com/)
*2023/05 - 2023/09*

- 承接並擴展既有 AWS Terraform IaC 代碼庫，提升基礎設施可維護性與跨環境的可重複使用性
- 將 GCP 納入多雲策略，從零開始以 Terraform 建置 GCP 基礎設施，統一雙雲平台的 IaC 開發規範與部署流程
- 透過將 AWS 與 GCP 對接資源整合，建立跨雲端的基礎架構，增強系統可用性與彈性擴展能力
- 使用 Ansible 撰寫 Playbook 進行伺服器組態管理與應用程式部署自動化，搭配 Terraform 建立完整的基礎設施即程式碼工作流
- 部署並維運多套 Prometheus + Grafana 監控堆疊，涵蓋各雲端節點與服務的指標收集、儀表板視覺化及告警規則設定，並將告警推播至 Telegram，提升整體基礎設施的可觀測性
- 診斷既有服務嚴重的 API 延遲問題，在正式 CDN 架構落地前，快速設計並實作 APICache Service 作為過渡方案，對高頻 API 進行快取以即時緩解效能瓶頸，以可接受的輕微資料時效性換取顯著的響應速度提升至 0.5 秒內，解決業務當前痛點
- 負責 CDN 正式架構的技術選型與方案評估，與團隊共同制定最終架構設計與技術路線，確保 CDN 系統的高效能、可擴展性與穩定性

#### Tech
- Backend: Golang, PostgreSQL, Redis
- CICD: GitlabCI, Docker, Terraform, Ansible
- Cloud platform: AWS, GCP

### Backend Developer | 天堂遊戲有限公司 (Paradise-Soft)
*2019/08 - 2023/05*

主要使用 Golang，負責設計與開發數據整合與處理系統支援內部其他服務需求，涵蓋 Web 爬蟲開發，自動化資訊收集與存儲（如彩票數據、流量導向網站），並開發獨立後端模組與 API 協助其他團隊

    - 開發彩票數據爬蟲與分析系統，提供即時彩票數據與分析結果，並製作彩票分析網站進行導流到公司主要業務平台
    - 開發體育數據爬蟲並整合付費第三方資料源，實現即時賽事數據供應；同步建置體育分析網站，有效導流至公司核心業務平台
    - 面對新資料源需求，主動協調 PM 及相關人員確認目標網站，獨立完成可行性評估與爬取難度分析，提出完整的爬取方案與時程規劃，成功交付多個來源的數據並投入實際業務應用
    - 獨立開發股指彩票數據爬蟲與資料收集系統，為公司主要業務平台拓展新玩法與增值服務
    - 支援並參與錢包服務的後端功能開發
    - 對 DWH 專案進行系統性重構，消除重複程式碼，降低模組間耦合度與增加長期可維護性
    - 重新設計新 Crawler 架構，優化爬取效率與系統穩定性，並擴充多項數據採集功能
    - 針對美術組的重複性作業流程開發自動化腳本工具，大幅提升工作效率並有效降低人為失誤

#### Tech
- Backend: Golang, MySQL, MongoDB, Redis, Elastic Search, Kafka, gRPC
- CICD: GitlabCI, Docker

### 軟體工程師 | Singularity 奇點數位科技有限公司
*2018/07 - 2019/08*

以 Egret 與 Cocos Creator 引擎搭配 TypeScript 進行遊戲前後端程式開發，後端以 PHP 為主，搭配 MySQL、Redis 進行資料存取，並負責 Linux 伺服器日常維運

- 與 PM、2D 美術及特效美術協作，獨立製作多款遊戲內的遊戲系統與功能
- 開發 Slot 遊戲模組加快遊戲開發流程，並協助其他團隊成員使用該模組開發 Slot 遊戲
- 改進遊戲 AI 行為
- 開發 Python 自動化腳本，加快美術 Photoshop 到遊戲引擎的工作流流程

#### Tech
- Frontend: Egret, Cocos Creator, TypeScript
- Backend: PHP, MySQL, Redis
- CICD: SVN

### Education
*2015/9 - 2019/6*
德明財經科技大學 資訊科技系
- 積極參與 ICPC、CPE 競賽 
- 曾獲自走車比賽季軍
- 畢業專題中研究自平衡車系統


## Skills
- Programming Languages: Golang, PHP, TypeScript, Python
- Databases: MySQL, MongoDB, Redis, Elastic Search
- Cloud Platforms: AWS, GCP
- CI/CD: GitlabCI, Docker, Terraform, Ansible
- Monitoring: Prometheus, Grafana
- Other Tools: Kafka, gRPC
- Version Control: Git, SVN

## Other Skills
### Design
- Blender
- Maya
- Photoshop

### Game Engine
- Unity
- Unreal

### Languages
- Chinese Traditional - Native
- Japanese - JLPT N2 
- English - Basic

## Projects
### TalkRealm
- 一款基於 Web 的多人即時對話軟體，前端使用 Vue 後端使用 Golang 實現，目前實現了基礎的聊天與語音直播通訊功能
https://chat.qrumi.org/
### StarResonanceFishing
- 基於 Python 的 スタレゾ（Star Resonance）釣魚自動化工具
### Aegis
- 分散式鎖服務，提供簡單易用的 RESTful API，gRPC 與 SDK，目前已實作 Redis、DynamoDB、PostgreSQL 與 MySQL 四種儲存引擎

## Interests
- PC Gaming (Steam)
- Meet my friends ヽ( ° ▽°)ノ
- Piano
- Anime
- Traveling

## References
- Email: ewew61212@gmail.com
- Phone: +886 972-995-881

- Date of Birth: 07/07/1997
- LinkedIn: https://www.linkedin.com/in/kai-jie-hsu-b895a5265
- GitHub: https://github.com/walnut-almonds
- Cake: https://www.cake.me/ewew61212
- 104: https://pda.104.com.tw/profile/share/8u4csxeUdy2vb5JASn84iq7Z2kje6PWK
