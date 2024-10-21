<template>
  <div>
    <div class="columns">
      <div class="column is-one-quarter chat-wrapper">
        <div
          v-for="room in rooms"
          :key="room.roomId"
          @click="
            () => {
              onRoomSelect(room.roomId);
            }
          "
          class="hover-style chat"
        >
          {{ room.studentName }}
        </div>
      </div>
      <div class="column">
        <div class="message-area">
          <div
            v-for="(messageItem, index) in messages"
            :key="index"
            :class="
              messageItem.senderUsername === tutorUsername
                ? `current-user`
                : `not-current-user`
            "
          >
            <div
              :class="`message-item ${
                messageItem.senderUsername === tutorUsername
                  ? `current-user-message-item`
                  : `not-current-user-message-item`
              }`"
            >
              {{ messageItem.message }}
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column mb-2">
            <b-input
              placeholder="Enter your message"
              expanded
              v-model="message"
              rounded
              @keydown.enter="sendMessage"
            />
          </div>
          <div class="column is-narrow mx-2 mb-2">
            <b-button rounded @click="sendMessage">Send</b-button>
          </div>
        </div>
      </div>
    </div>
    <AppLoader :isLoading="isLoading" />
  </div>
</template>

<script>
import AppLoader from "@/components/AppLoader/appLoader.vue";
import { apiRequestManager } from "@/util/util";
import { io } from "socket.io-client";

export default {
  name: "TutorChats",
  data() {
    return {
      socket: null,
      isLoading: false,
      messageFromAllRooms: [],
      messages: [],
      selectedRoomId: "",
      rooms: [],
      message: "",
      tutorUsername: "",
    };
  },
  components: {
    AppLoader,
  },
  created() {
    this.socket = io("http://localhost:8081");
    this.socket.on("receiveMessage", this.handleIncomingMessage);
    this.socket.on("loadOldMessages", this.handleOldMessages);
  },
  methods: {
    joinRoom(studentUsername, tutorUsername) {
      this.socket.emit("joinRoom", { studentUsername, tutorUsername });
    },
    sendMessage() {
      this.socket.emit("sendMessage", {
        roomId: this.selectedRoomId,
        senderUsername: this.tutorUsername,
        message: this.message,
      });

      this.message = "";
    },
    handleIncomingMessage({ roomId, senderUsername, message }) {
      console.log("new");
      const isFound = this.messageFromAllRooms.find(
        (room) => room.roomId === roomId
      );

      if (isFound) {
        isFound.messages.push({ senderUsername, message });
        this.messages = isFound.messages;
        return;
      }

      this.messageFromAllRooms.push({
        roomId,
        messages: [{ senderUsername, message }],
      });

      this.messages = [{ senderUsername, message }];
    },
    handleOldMessages(messages) {
      messages.forEach((message) => {
        const isFound = this.messageFromAllRooms.find(
          (ar) => ar.roomId === message.roomId
        );

        if (isFound) {
          isFound.messages.push({
            senderUsername: message.senderUsername,
            message: message.message,
          });
        } else {
          this.messageFromAllRooms.push({
            roomId: message.roomId,
            messages: [
              {
                senderUsername: message.senderUsername,
                message: message.message,
              },
            ],
          });
        }
      });
    },
    fetchAcceptedRequests() {
      const comp = this;
      comp.isLoading = true;
      apiRequestManager("get", "/tutor/accepted-requests", {}, {}, (res) => {
        comp.isLoading = false;
        if (res.status === 200) {
          this.rooms = [];
          res.data.requests.forEach((request) => {
            this.rooms.push({
              studentName: request.username,
              roomId: `${request.username}_${this.tutorUsername}`,
            });
            comp.joinRoom(request.username, this.tutorUsername);
          });
          return;
        }
      });
    },
    onRoomSelect(roomId) {
      this.selectedRoomId = roomId;
      this.messages =
        this.messageFromAllRooms.find((rooms) => rooms.roomId === roomId)
          ?.messages || [];
    },
  },
  mounted() {
    this.tutorUsername = localStorage.getItem("username");
    this.fetchAcceptedRequests();
  },
  watch: {
    $route: "fetchAcceptedRequests",
  },
};
</script>

<style scoped>
.message-area {
  height: calc(100vh - 115px);
  padding: 20px !important;
  overflow-y: scroll;
}
.chat-wrapper {
  padding: 10px 0 !important;
}
.chat {
  background-color: #071f5d;
  color: #fff;
  padding: 10px;
  text-align: center;
}
.message-item {
  padding: 10px 20px;
  margin: 2px 0;
  color: #fff;
  max-width: 400px;
  border-radius: 30px;
}
.current-user-message-item {
  background-color: #071f5d;
}
.not-current-user-message-item {
  background-color: #006fb7;
}
.current-user {
  display: flex;
  justify-content: flex-end;
}
.not-current-user {
  display: flex;
  justify-content: start;
}
</style>
