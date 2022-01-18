import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sample from "../images/sample.jpg";
// import Pp from "../images/pp.jpg";
import axios from "axios";
import Swal from "sweetalert2";

const DivBox = styled.div`
  border: 1px solid #63b5f6;
  width: 70%;
  height: 30vw;
  display: block;
  margin-right: auto;
  margin-left: auto;
  /* background-image: url(${Sample}); */
  background-size: 100% 30vw;
  @media ${({ theme }) => theme.device.mobile} {
    width: 60%;
  }
`;

const DetailLine = styled.div`
  // border: 2px solid #63b5f6;
  height: 100%;
  width: 78%;
  float: right;

  & h1 {
    text-align: left;
    margin: 3vw 0 3vw 1vw;
    color: #095cd8;
    font-size: 50px;
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 2rem;
      margin: 5vw 0 4vw 1vw;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    font-size: 1rem;
    text-align: center;
    border: none;
    border: 2px solid #63b5f6;
    margin-top: 10px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 29.8vw;
  background: #fff;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const ImgReview = styled.img`
  width: 100%;
  height: 147px;
  border-radius: 20px;
  objectfit: scale-down;
  background: #fff;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const Profile = styled.input``;

const ProfileEditing = styled.label`
  // border: 1px solid #63b5f6;
  // background-color: #63b5f6;
  color: #7e57c2;
  // border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #4d2c91;
  }
  display: block;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 10px;
    &:hover {
      color: #4d2c91;
    }
  }
`;
const DivBox1 = styled.div`
  border: 1px solid #63b5f6;
  width: 20%;
  height: 148px;
  float: left;
  margin: 0 10px 10px 10px;
  border-radius: 20px;
  /* background-image: url(${Sample}); */
  background-size: 100% 148px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 50%;
    float: none;
    margin: 0 auto;
  }
`;

const ProfileEditing2 = styled.label`
  cursor: pointer;
  display: block;
  margin: 0 auto;
  text-align: center;
  color: #7e57c2;
  font-weight: bold;
  &:hover {
    color: #4d2c91;
  }
  height: 100%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    font-size: 13px;
  }
`;

const Box = styled.div`
  margin: 0 atuo;
`;

const SmallTitle = styled.h2`
  margin: 3.5vw 0 1vw 1vw;
  padding: 0.5vw;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 9vw 0 5vw 1vw;
    padding: 1vw;
    text-align: left;
  }
`;

const Divtag = styled.div`
  margin: 1.5vw;
  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 3vw;
    text-align: left;
  }
`;

const Divtag2 = styled.div`
  margin: 1.5vw;
  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 3vw;
    text-align: left;
  }
`;

const Review = styled.h2`
  margin: 2vw;
  float: left;
  @media ${({ theme }) => theme.device.mobile} {
    float: left;
    text-align: left;
    font-size: 20px;
  }
`;

const Button = styled.button`
  margin: 2vw;
  float: right;
  border: 2px solid #63b5f6;
  background-color: #63b5f6;
  border-radius: 30px;
  color: #fff;
  padding: 3px;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    width: 20%;
    float: right;
    font-size: 0.8rem;
    margin-bottom: 5vw;
  }
`;

const ReviewContainer = styled.div`
  padding-bottom: 2rem;
`;

const ReviewNik = styled.input`
  display: block;
  width: 20%;
  height: 2rem;
  border: none;
  margin-bottom: 5px;
  font-weight: bold;
  background-color: white;
  color: #095cd8;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 1vw;
    width: 100%;
    background: none;
    font-size: 13px;
  }
`;

const ReviewTextarea = styled.textarea`
  width: 70%;
  height: 4.8rem;
  border: 1px solid #63b5f6;
  resize: none;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 5rem;
  }
`;

const MedicalDetail = ({ medicalInfo, userInfo, isLogin, auth }) => {
  console.log("userInfo whwat", userInfo);
  const [reviews, setReviews] = useState([]); //해당 병원 review 가져오기
  useEffect(() => {
    axios
      .post(
        "http://localhost:80/review/info",
        { hospital_name: medicalInfo.place_name },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("whatwhat?", res);
        setReviews(res.data.reviewInfo);
        // return;
      });
  }, [medicalInfo]); //최초 렌더링 시 한번만 실행. componentDidmount

  const [reviewInfo, setreviewInfo] = useState({
    content: "",
  });

  const reviewChange = (key) => (e) => {
    setreviewInfo({
      ...reviewInfo,
      [key]: e.target.value,
    });
  };

  const handleClick = () => {
    Swal.fire({
      icon: "error",
      title: "로그인이 필요해요",
      text: "회원이 아니시면 회원가입 해주세요",
    });
  };

  const handleDocClick = () => {
    Swal.fire({
      icon: "error",
      title: "의사선생님 또는 관리자인가요?",
      text: "일반 이용자만 리뷰를 작성하실 수 있어요",
    });
  };

  const submit = () => {
    const formdata = new FormData();
    formdata.append("content", reviewInfo.content);
    formdata.append("kakao_userid", localStorage.getItem("userid"));
    // formdata.append("users_id", userInfo.id);
    formdata.append("receipts_img", imgInfo.file);
    formdata.append("hospital_name", medicalInfo.place_name);
    axios
      .post("http://localhost:80/review/upload", formdata, {
        headers: { "Content-type": "multipart/form-data" },
        withCredentials: true,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "리뷰가 성공적으로 등록되었습니다",
        });
      })
      .then(() => {
        setImgInfo({
          file: [],
          filepreview: null,
        });
        setreviewInfo({
          content: "",
        });
      });
  };

  //<-- 병원 이미지 저장 시작 -->
  const [fileImage, setFileImage] = useState({
    file: [],
    filepreview: null,
  });

  const saveFileImage = (e) => {
    setFileImage({
      ...fileImage,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  //<--다시 봐야할것 -->
  const uploadhospital = () => {
    const formdata = new FormData();
    formdata.append("hospital_name", medicalInfo.place_name);
    formdata.append("hospital_img", fileImage.file);
    axios
      .post("http://localhost:80/hospital/upload", formdata, {
        headers: { "Content-type": "multipart/form-data" },
        withCredentials: true,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "병원사진이 성공적으로 등록되었습니다",
        });
      });
  };

  const noPhotoSave = () => {
    Swal.fire({
      icon: "error",
      title: "병원 관계자인가요?",
      text: "병원 관계자만 사진을 저장하실 수 있어요",
    });
  };

  //<-- 병원 이미지 저장 끝 -->

  //<-- 영수증 저장 시작 -->
  const [imgInfo, setImgInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleImgChange = (e) => {
    setImgInfo({
      ...imgInfo,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
  };
  //<-- 영수증 저장 끝 -->

  return (
    <>
      <DetailLine>
        <h1>{medicalInfo.place_name}</h1>
        {/* 사진업로드 시작 */}
        {/* 내가적은것 시작 */}
        <DivBox>
          <Box onChange={saveFileImage}>
            {fileImage.filepreview !== null ? (
              <Img
                src={fileImage.filepreview}
                alt="uploadimage"
                style={{
                  width: "100px",
                  height: "90px",
                  objectFit: "scale-down",
                }}
              />
            ) : (
              <ImgReview src={Sample} alt="uploadimage" />
            )}
          </Box>
          <Profile
            type="file"
            id="upload-hospital"
            style={{
              display: "none",
            }}
            onChange={saveFileImage}
          />
          <ProfileEditing htmlFor="upload-hospital" onChange={saveFileImage}>
            병원사진 업로드
          </ProfileEditing>
        </DivBox>

        {isLogin === false ? (
          <Button onClick={handleClick}>병원사진 저장</Button> //로그인 후 사진을 저장하실 수 있습니다.
        ) : auth === 1 && medicalInfo.place_name === userInfo.hospital ? (
          <Button onClick={uploadhospital}>병원사진 저장</Button>
        ) : (
          <Button onClick={noPhotoSave}>병원사진 저장</Button> //병원 관계자만 사진저장 가능합니다.
        )}
        {/* 내가적은것 끝 */}

        {/* 사진업로드 끝 */}

        {/* 리스트 */}
        <SmallTitle>병원주소</SmallTitle>
        <Divtag>{medicalInfo.address_name} </Divtag>
        <SmallTitle>전화</SmallTitle>
        <Divtag2>{medicalInfo.phone} </Divtag2>
        {/* 리스트 끝 */}
        <hr></hr>

        {/* 리뷰작성 시작 */}

        <>
          <Review>리뷰</Review>
          {isLogin === false ? (
            <Button onClick={handleClick}>리뷰쓰기</Button>
          ) : auth === 1 || auth === 0 ? (
            <Button onClick={handleDocClick}>리뷰쓰기</Button>
          ) : (
            <Button onClick={submit}>리뷰쓰기</Button>
          )}
          {/* <Button type="submit">리뷰쓰기</Button> */}

          <div style={{ clear: "both" }}></div>
          <ReviewContainer>
            <DivBox1>
              <Profile
                type="file"
                id="upload-file"
                style={{
                  display: "none",
                }}
                onChange={handleImgChange}
              />

              <Box onChange={handleImgChange}>
                {imgInfo.filepreview !== null ? (
                  <ImgReview
                    src={imgInfo.filepreview}
                    alt="uploadimage"
                    style={{
                      width: "100px",
                      height: "90px",
                      objectFit: "scale-down",
                    }}
                  />
                ) : (
                  <ImgReview
                    style={{
                      width: "100px",
                      height: "90px",
                      objectFit: "scale-down",
                    }}
                    src={Sample}
                    alt="publicimage"
                  />
                )}
              </Box>
              <ProfileEditing2 htmlFor="upload-file" onChange={handleImgChange}>
                영수증 업로드
              </ProfileEditing2>
            </DivBox1>

            <ReviewNik
              placeholder="닉네임"
              type="text"
              disabled
              // value={userInfo.nickname}
            />
            <ReviewNik
              placeholder="병원명"
              type="text"
              disabled
              value={medicalInfo.place_name}
            />
            <ReviewTextarea
              onChange={reviewChange("content")}
              placeholder="'내용' 입력 후 '리뷰쓰기' 버튼을 눌러주세요."
              value={reviewInfo.content}
            />
          </ReviewContainer>
          <hr></hr>
          <br></br>
          {/* 리뷰작성 끝 */}
          {reviews.map((review) => {
            return (
              <ReviewContainer>
                <DivBox1>
                  <Box>
                    <ImgReview
                      src={require(`../../public/receipts/${review.receipts_img}`)}
                      alt="uploadimg"
                    />
                  </Box>
                </DivBox1>

                <ReviewNik
                  disabled
                  placeholder="닉네임"
                  type="text"
                  value={review.user ? review.user.nickname : "Kakao"}
                />
                <ReviewNik disabled value={medicalInfo.place_name} />
                <ReviewTextarea placeholder={review.content} />
              </ReviewContainer>
            );
          })}
        </>

        {/* 리뷰 끝 */}
      </DetailLine>
    </>
  );
};

export default MedicalDetail;
