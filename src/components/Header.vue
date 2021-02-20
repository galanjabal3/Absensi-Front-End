<template>
  <header>
    <div class="brand">
      <h5>Web Absen</h5>
    </div>
    <div class="nav">
      <ul>
        <li>
          <img src="../assets/logo1.jpg" alt="avatar">
          <span>Squad Crott.</span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>


<style lang="scss" scoped>
header {
  display: flex;
  background: rgb(32, 32, 31);
  margin: 0;
  padding: 5px 40px;
  color: whitesmoke;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  .brand {
    flex: 1;
    display: flex;
    align-items: center;
    h5 {
      font-family: "Lobster Two", cursive;
      font-size: 20px;
      margin: 0;
      letter-spacing: 1px;
    }
  }
  ul {
    list-style: none;
    padding-left: 0;
    display: flex;
    li {
      display: flex;
      align-items: center;
      img {
        height: 40px;
        border-radius: 50%;
      }
      span {
        margin-left: 8px;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
}
</style>