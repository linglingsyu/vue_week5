<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
            <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品列表</router-link>
            <!-- <a class="nav-link" href="#">產品列表</a> -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/carts">我的購物車/結帳</router-link>
            <!-- <a class="nav-link" href="#">我的購物車/結帳</a> -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
