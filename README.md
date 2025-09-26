# ❤️ Heart Disease Risk Prediction

## 📌 Problem Statement

Our healthcare analytics division wants to shift toward preventive care. We aim to build an **ML-based tool** that predicts whether an individual is at **high risk** for heart disease, so clinicians and health planners can prioritize early interventions and monitoring.

## 🎯 Project Idea & Scope

  - Develop a **classification model** to predict **high risk vs. low risk**.
  - Deploy it in a **lightweight frontend** (e.g., Streamlit or web app).
  - Allow users (health professionals/analysts) to input patient demographics and clinical/lifestyle features to get a **risk estimate** in real time.

## 🛠 Project Phases

### 📢 Phase 1: Data Preparation

  - **Data Loading**: The dataset was loaded from a CSV file into a pandas DataFrame, revealing a shape of (1025, 14), indicating 1025 records and 14 features.
  - **Initial Inspection**: Checked for missing values using `.isna().sum()` and found none, ensuring the dataset was complete.
  - **Duplicate Handling**: Identified and removed **723 duplicate rows** to ensure the integrity of the analysis and model training. The cleaned dataset consists of 302 unique records.

-----

### 📢 Phase 2: Exploratory Data Analysis (EDA) & Feature Building

  - **Target Variable Distribution**: The target variable is nearly balanced, with **51.3%** of individuals having heart disease and **48.7%** not having it, providing a good foundation for building a classification model.
  - **Key Visualizations & Insights**:
      - **Age & Sex**: Males show a higher incidence of heart disease than females. The risk appears across various age groups.
      - **Chest Pain (cp)**: Atypical angina (type 1) and non-anginal pain (type 2) are more strongly associated with a positive heart disease diagnosis.
      - **Maximum Heart Rate (thalach)**: Individuals with heart disease tend to achieve a higher maximum heart rate.
      - **Correlation Analysis**: A heatmap revealed that features like `cp`, `thalach`, and `slope` are positively correlated with the target, while `exang`, `oldpeak`, and `ca` show negative correlations.
  - **Outlier Detection**: Boxplots for `trestbps`, `chol`, `thalach`, and `oldpeak` identified the presence of outliers, which were noted for consideration during modeling.

-----

### 📢 Phase 3: Model Training & Validation

  - **Feature Scaling**: To prepare the data for models sensitive to feature scales (like Logistic Regression and SVM), two scaling methods were applied to the numerical features (`age`, `trestbps`, `chol`, `thalach`): **Log Transformation** and **Standard Scaling**.
  - **Model Training**: A variety of classification models were trained, including **Logistic Regression, SVM, Decision Tree, Random Forest, XGBoost, and AdaBoost**.
  - **Hyperparameter Tuning**: **GridSearchCV** was employed to find the optimal parameters for the SVM, Decision Tree, and Random Forest models, significantly improving their performance.
  - **Performance Evaluation**: All models were evaluated on the test set using **Accuracy, Recall, Precision, and F1-score**. A comparative bar chart was generated to visualize the performance of each model.

#### 🏆 Best Model

After a comprehensive comparison, the **tuned Random Forest classifier** emerged as the best-performing model, achieving an **accuracy of 86.9%** and a balanced **F1-score of 87.0%** on the test set. This model was saved as `best_random_forest_model.pkl` for deployment.

-----

### 📢 Phase 4: Deployment via Web Interface & Finalization

  - **Backend API**: A lightweight backend was developed and deployed on **Railway**, which serves the trained Random Forest model. The API receives patient data and returns a risk prediction.
  - **Frontend Application**: A user-friendly web interface was built and deployed on **GitHub Pages**. This interface allows users to input clinical features and interact with the model seamlessly.
  - **Finalization**: The project is now fully functional and available for use.

## 🚀 Deployment

The heart disease risk prediction tool is now live\!

  - **🌐 Live Web App**: [**Access the tool here**](https://youssefg02.github.io/GTC-Heart-Disease-Risk-Prediction/)
  - **🔌 Backend API**: The API is hosted on [**Railway**](https://heart-disease-risk-prediction.up.railway.app/).

## 📊 Presentation & Demo

  - **Presentation Slides**: A detailed presentation summarizing the project's objectives, methodology, and results can be found [**here**](https://www.canva.com/design/DAGz_oao5ys/Q_6N9jGaGkehj-UmcfrFFQ/view?utm_content=DAGz_oao5ys&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h85b1bc9d98).
  - **Demo Video**: Watch a screen recording of the web application in action [**here**](https://drive.google.com/file/d/1EQlG2Q16CreBSWOHo52IfxZEsOt1SJc7/view).

## 🛠️ How to Use

1.  **Navigate** to the live web app link provided above.
2.  **Enter** the patient's clinical and demographic information into the input fields.
3.  **Click** the "Predict" button to submit the data.
4.  The model will process the inputs and display the **risk prediction** (High Risk or Low Risk) on the screen.

## 💻 Technologies Used

  - **Backend**: Python, FastAPI, Uvicorn, Pydantic
  - **Frontend**: HTML, CSS, JavaScript (Fetch API)
  - **Deployment**: Railway (Backend), GitHub Pages (Frontend)
  - **Machine Learning**: Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, Joblib

## 📦 Deliverables

  - A trained **heart disease prediction model** with an accuracy of 86.9%.
  - A **summary report** (this README) explaining the project phases and results.
  - A **live web application** for real-time risk predictions.
